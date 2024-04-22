import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';

interface ChartProps {
    data: any;
}

const CandleStick: React.FC<ChartProps> = ({ data }) => {
    const chartContainerRef = useRef<any>();

    useEffect(() => {
        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };

        const chart = createChart(chartContainerRef.current, {
            width: 1200,
            height: 700,
            layout: {
                background: {
                    type: "solid",
                    color: "#000000",
                },
                textColor: "rgba(255, 255, 255, 0.9)",
            },
            grid: {
                vertLines: {
                    color: "rgba(197, 203, 206, 0.5)",
                },
                horzLines: {
                    color: "rgba(197, 203, 206, 0.5)",
                },
            },
            crosshair: {
                mode: CrosshairMode.Normal,
            },
            rightPriceScale: {
                borderColor: "rgba(197, 203, 206, 0.8)",
            },
            timeScale: {
                borderColor: "rgba(197, 203, 206, 0.8)",
            },
        });

        chart.timeScale().fitContent();

        const candleSeries = chart.addCandlestickSeries();

        data ? candleSeries.setData(data) : null;

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data]);

    return (
        <div
            className="overflow-clip rounded-2xl w-min flex justify-center items-center"
            id="tvchart"
            ref={chartContainerRef}
        ></div>
    );
};

export default CandleStick;