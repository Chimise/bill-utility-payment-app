import React from 'react';
import AuthLayout from '../../components/common/AuthLayout/AuthLayout';
import Panel from '../../components/ui/Panel/Panel';
import DashboardContainer from '../../components/ui/DashboardContainer/DashboardContainer';
import DashboardHeader from '../../components/common/DashboardHeader/DashboardHeader';

type Faq = {
    header: string;
    content: string;
}
const faqs: Faq[] = [{header: "How do I fund my wallet", content: "When funding wallet, you can choose to fund it through manual or instant payment process"}, {header: "HOW IS INSTANT PAYMENT DONE", content: "Go to FUND WALLET, click on ATM card, select PAYSTACK and fund your wallet using either the USSD, bank transfer, or ATM card option for the payment."}, {header: "HOW IS MANUAL PAYMENT DONE", content: "Go to FUND WALLET, click on bank transfer and select your Bank and proceed with the payment."}, {header: "I FUNDED MY WALLET BUT IT HASN’T REFLECTED", content: "For Wallet Funding issues, You can report the issue to our support team at support@mycheapnet.com or tap on the WhatsApp icon at the bottom of the page to make a request and our team will ensure it reflects as soon as possible."}, {header: "IS Nccomtech registered", content: "Yes."}, {header: "HOW DOES IT WORK", content: "STEP 1: Sign up on www.mycheapnet.com. STEP 2: Fund your wallet manually or through Paystack. STEP 3: Go to Data top-up to purchase a data plan of your choice, Go to Airtime top-up to purchase airtime, Go to Cable TV Subscriptions to purchase DSTV, GOTV, etc, subscriptions of your choice, Go to electricity, select disco Enter meter type, number and amount needed STEP 4: Go to transfer if you want to fund someone’s wallet from yours. Enter the amount and phone number, then proceed. Fund your wallet using the instant payment or manual payment method. Instant payment method: Go to Wallet funding click on ATM card, select PAYSTACK, then choose either the USSD, Bank transfer, or Card payment. For manual payment: Go to Wallet funding click on Bank transfer, select the bank of your choice and pay to."}]

const FaqPage = () => {
    return (<DashboardContainer>
        <DashboardHeader className='text-center' title="Frequently Asked Questions (FAQ)" />
        <div className='my-6 space-y-6'>
            {faqs.map((faq, index) => (
                <Panel key={index} header={faq.header.toUpperCase()} content={faq.content} />
            ))}
        </div>
    </DashboardContainer>)
}

FaqPage.getLayout = (children: React.ReactNode) => {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}

export default FaqPage;