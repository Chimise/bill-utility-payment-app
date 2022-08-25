import type {TransformedData} from './Pricing';
import PricingCard from './PricingCard';

interface PricingCardListProps {
    dataPlans: TransformedData
}






const PricingCardList = ({dataPlans}: PricingCardListProps) => {
    return (<div className='my-7 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-6'>
        {Object.entries(dataPlans).map(([provider, providerData]) => {
            return Object.keys(providerData).map((type) => {
                return (
                    <div key={`${provider}-${type}`}>
                        <PricingCard provider={provider} type={type} plans={providerData[type]} />
                    </div>

                )
            })
        })}
    </div>);
}


export default PricingCardList;