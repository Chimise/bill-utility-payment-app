import React, { useEffect, useState, useMemo } from "react";
import { NextSeo } from "next-seo";
import AuthLayout from "../../../components/common/AuthLayout/AuthLayout";
import Paper from "../../../components/ui/Paper/Paper";
import UtilityHeader from "../../../components/common/UtilityHeader/UtilityHeader";
import { useRouter } from "next/router";
import useCharge from "../../../hooks/useCharge";
import useAccounts from "../../../hooks/useAccounts";
import Spinner from "../../../components/ui/Spinner/Spinner";
import Error from "../../../components/ui/Error/Error";

const DedicatedAccountPage = () => {
  const { query, isReady, replace } = useRouter();
  const [amount, setAmount] = useState(0);
  const { charges } = useCharge(amount);
  const { accounts, isLoading, error, mutate } = useAccounts();

  const total = useMemo(() => {
    if (charges) {
      return charges.dedicated + amount;
    } else {
      return 0;
    }
  }, [charges, amount]);

  useEffect(() => {
    if (isReady) {
      const amount = Array.isArray(query.amount)
        ? query.amount[0]
        : query.amount;
      if (!amount) {
        replace("/dashboard/wallet/fund");
      } else {
        setAmount(parseInt(amount));
      }
    }
  }, [isReady, replace, query]);

  return (
    <div className="bg-white w-full h-auto md:h-full">
      <NextSeo
        title="Dedicated Account"
        description="Make your payments using dedicated accounts"
        nofollow
        noindex
      />
      <UtilityHeader title="Fund Your Account" />
      <div className="p-7  my-3 mb-5">
        <p className="mb-4 text-slate-900 text-sm font-light text-center">
          Send Money to any of the account and top up instantly
        </p>
        <div className="w-full space-y-8 md:space-y-0 md:flex md:space-x-7 md:justify-center">
          {error && (
            <div className="flex justify-center p-3">
              <Error
                error={error.message}
                onRetry={() => mutate()}
                className="p-5"
              />
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center p-3">
              <Spinner className="p-2" />
            </div>
          )}
          {accounts &&
            accounts.map((account) => (
              <Paper key={account.id}>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <div className="text-sm font-medium text-gray-500">Bank</div>
                  <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {account.bank}
                  </div>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <div className="text-sm font-medium text-gray-500">
                    Account Name
                  </div>
                  <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {account.name}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <div className="text-sm font-medium text-gray-500">
                    Account Number
                  </div>
                  <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {account.account_number}
                  </div>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <div className="text-sm font-medium text-gray-500">
                    Amount
                  </div>
                  <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {total}
                  </div>
                </div>
              </Paper>
            ))}
        </div>
      </div>
    </div>
  );
};

DedicatedAccountPage.isAuth = true;

DedicatedAccountPage.getLayout = (children: React.ReactNode) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default DedicatedAccountPage;
