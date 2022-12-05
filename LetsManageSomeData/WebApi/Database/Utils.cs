using System.Globalization;

namespace WebApi.Database;

public class Utils
{
    public enum TransactionStatus
    {
        Successful,
        Disputed,
        Failed,
    }

    public static TransactionStatus GetTransactionStatus(string status)
    {
        switch (status)
        {
            case "00":
                return TransactionStatus.Successful;
            case "30":
                return TransactionStatus.Disputed;
            default:
                return TransactionStatus.Failed;
        }
    }

    public enum AccountType
    {
        Current,
        Savings,
    }

    public static AccountType GetAccountType(string accountType)
    {
        switch (accountType)
        {
            case "1":
                return AccountType.Current;
            case "2":
                return AccountType.Savings;
            default:
                return AccountType.Current;
        }
    }

    public static AccountType GetAccountTypeFromName(string accountTypeName)
    {
        switch (accountTypeName)
        {
            case "Current":
                return AccountType.Current;
            case "Savings":
                return AccountType.Savings;
            default:
                return AccountType.Current;
        }
    }

    public static bool IsTimeBreached(DateTime lineTransactionDate, DateTime lineEffectiveStatusDate)
    {
        // return true if difference between lineTransactionDate and lineEffectiveStatusDate is greater than 7 days
        return (lineEffectiveStatusDate - lineTransactionDate).Days > 7;
    }

    public static DateTime ParseDate(string? date)
    {
        if (string.IsNullOrEmpty(date))
        {
            return DateTime.MinValue;
        }

        return DateTime.ParseExact(date, "dd/MM/yyyy", CultureInfo.InvariantCulture);
    }
}