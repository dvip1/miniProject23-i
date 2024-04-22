import React from 'react';

export interface RecommendationInterface {
    RECOMMENDATION: string;
    BUY: number;
    SELL: number;
    NEUTRAL: number;
}

interface RecommendationDisplayProps {
    recommendation: RecommendationInterface | null;
}

const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({
    recommendation,
}) => {
    return (
        <div
            className={
                recommendation ? `recommend flex justify-center` : `hidden`
            }
        >
            <p>
                Recommendation:
                <span
                    className={
                        recommendation?.RECOMMENDATION === 'BUY'
                            ? 'text-green-500'
                            : 'text-red-500'
                    }
                >
                    <span className="text-lg"> {recommendation?.RECOMMENDATION} </span>
                </span>
                <br />
                <span className="px-2">
                    {' '}
                    <span className="text-md ">Sell </span>: {recommendation?.SELL}{' '}
                </span>
                <span className="px-2">
                    {' '}
                    <span className="text-md ">Buy </span>: {recommendation?.BUY}{' '}
                </span>
                <span className="px-2">
                    {' '}
                    <span className="text-md ">Neutral </span>:
                    {recommendation?.NEUTRAL}
                </span>
            </p>
        </div>
    );
};

export default RecommendationDisplay;