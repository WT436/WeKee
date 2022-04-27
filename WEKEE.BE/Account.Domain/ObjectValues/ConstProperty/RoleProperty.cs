﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Account.Domain.ObjectValues.ConstProperty
{
    public enum RoleProperty
    {
        NULL = 0,
        ID = 1,
        CREATE_BY = 2,
        CREATE_DATE_UTC = 3,
        UPDATE_DATE_UTC = 4,
    }

    public enum RoleTypes
    {

    }

    public class RoleTransform
    {
        public static string CONVERT_SQL(int key)
        {
            return (RoleProperty)key switch
            {
                RoleProperty.ID => "R.[id]",
                RoleProperty.CREATE_BY => "R.[CreateBy]",
                RoleProperty.CREATE_DATE_UTC => "R.[CreatedOnUtc]",
                RoleProperty.UPDATE_DATE_UTC => "R.[UpdatedOnUtc]",

                _ => "Id",
            };
        }

        public static string CONVERT_SQL(int key, string value)
        {
            switch ((RoleProperty)key)
            {
                case RoleProperty.ID:
                    return $"R.[id] = {value}";
                case RoleProperty.CREATE_BY:
                    return $"R.[CreateBy]  = {value}";
                case RoleProperty.CREATE_DATE_UTC:
                    var DateEnd = value[(value.IndexOf("|") + 1)..];
                    var DateStart = value[..value.IndexOf("|")];

                    // check thứ tự
                    if (Convert.ToDateTime(DateStart) > Convert.ToDateTime(DateEnd))
                    {
                        (DateEnd, DateStart) = (DateStart, DateEnd);
                    }
                    // Quá khứ đến Date End
                    if (String.IsNullOrEmpty(DateStart) && !String.IsNullOrEmpty(DateEnd))
                        return $"R.[CreatedOnUtc] <=  CONVERT(datetime, '{DateEnd}')";
                    // Từ start đến tương lai 
                    else if (!String.IsNullOrEmpty(DateStart) && String.IsNullOrEmpty(DateEnd))
                        return $"R.[CreatedOnUtc] >=  CONVERT(datetime, '{DateStart}')";
                    // Chính xác
                    else if (!String.IsNullOrEmpty(DateStart) && !String.IsNullOrEmpty(DateEnd)
                        && Convert.ToDateTime(DateStart) == Convert.ToDateTime(DateEnd))
                        return $"(CAST(R.[CreatedOnUtc] AS Date) =  '{DateStart}')";
                    // từ start đến end
                    else if (!String.IsNullOrEmpty(DateStart) && !String.IsNullOrEmpty(DateEnd))
                        return $"(R.[CreatedOnUtc] BETWEEN CONVERT(datetime, '{DateStart}') AND CONVERT(datetime, '{DateEnd}'))";
                    // ko tìm kiếm
                    else
                        return $"R.[CreatedOnUtc] IS NOT NULL";
                case RoleProperty.UPDATE_DATE_UTC:
                    var DateEndUpdate = value[(value.IndexOf("|") + 1)..];
                    var DateStartUpdate = value[..value.IndexOf("|")];

                    // check thứ tự
                    if (Convert.ToDateTime(DateStartUpdate) > Convert.ToDateTime(DateEndUpdate))
                    {
                        (DateEndUpdate, DateStartUpdate) = (DateStartUpdate, DateEndUpdate);
                    }
                    // Quá khứ đến Date End
                    if (String.IsNullOrEmpty(DateStartUpdate) && !String.IsNullOrEmpty(DateEndUpdate))
                        return $"R.[UpdatedOnUtc] <=  CONVERT(datetime, '{DateEndUpdate}')";
                    // Từ start đến tương lai 
                    else if (!String.IsNullOrEmpty(DateStartUpdate) && String.IsNullOrEmpty(DateEndUpdate))
                        return $"R.[UpdatedOnUtc] >=  CONVERT(datetime, '{DateStartUpdate}')";
                    // Chính xác
                    else if (!String.IsNullOrEmpty(DateStartUpdate) && !String.IsNullOrEmpty(DateEndUpdate)
                        && Convert.ToDateTime(DateStartUpdate) == Convert.ToDateTime(DateEndUpdate))
                        return $"(CAST(R.[UpdatedOnUtc] AS Date) =  '{DateStartUpdate}')";
                    // từ start đến end
                    else if (!String.IsNullOrEmpty(DateStartUpdate) && !String.IsNullOrEmpty(DateEndUpdate))
                        return $"(R.[UpdatedOnUtc] BETWEEN CONVERT(datetime, '{DateStartUpdate}') AND CONVERT(datetime, '{DateEndUpdate}'))";
                    // ko tìm kiếm
                    else
                        return $"R.[UpdatedOnUtc] IS NOT NULL";

                default: return $"R.[Id] = {value}";
            };
        }
    }
}