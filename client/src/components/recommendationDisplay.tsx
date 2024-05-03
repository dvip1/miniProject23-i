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
function checkWhichRecommendation(input: string) {
    if (input === 'STRONG_BUY' || input === 'BUY') return 'one';
    else if (input === 'STRONG_SELL' || input === 'SELL') return 'zero';
    else return 'two';
}
function giveStyle(foo: string, boo: string) {
    if (checkWhichRecommendation(foo) === boo) return 'bg-[#D0E7D2]'

    return ''


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
                <span className={`p-2  mx-1 rounded-lg border-2 border-[#64CCC5] ${giveStyle(recommendation?.RECOMMENDATION, `zero`)}`}>
                    {' '}
                    <span className="text-md ">Sell </span>: {recommendation?.SELL}{' '}
                </span>
                <span className={`p-2 ${giveStyle(recommendation?.RECOMMENDATION, `one`)} mx-1 rounded-lg border-2 border-[#64CCC5]`}>
                    {' '}
                    <span className="text-md ">Buy </span>: {recommendation?.BUY}{' '}
                </span>
                <span className={`p-2 ${giveStyle(recommendation?.RECOMMENDATION, `two`)} mx-1 rounded-lg border-2 border-[#64CCC5]`}>
                    {' '}
                    <span className="text-md ">Neutral </span>:
                    {recommendation?.NEUTRAL}
                </span>
            </p>
        </div >
    );
};

export default RecommendationDisplay;