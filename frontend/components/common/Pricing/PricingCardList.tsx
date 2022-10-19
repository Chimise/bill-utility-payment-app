import type { TransformedPlans } from './Pricing';
import PricingCard from './PricingCard';


interface PricingCardListProps {
    dataPlans: TransformedPlans
}



const PricingCardList = ({dataPlans}: PricingCardListProps) => {
    return (<div className='my-7 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-6'>
        {Object.entries(dataPlans).map(([key, plans]) => {
            return (
                    <div key={key}>
                    <PricingCard provider={plans[0].provider.name.toLowerCase()} type={key} plans={plans} />
                </div>
            )
        })}
    </div>);
}


export default PricingCardList;