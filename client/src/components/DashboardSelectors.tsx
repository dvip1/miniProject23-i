import ReactSelect from "react-select";
const dateOptions = [
    { value: '1d', label: '1d' },
    { value: '5d', label: '5d' },
    { value: '1mo', label: '1mo' },
    { value: '3mo', label: '3mo' },
    { value: '6mo', label: '6mo' },
    { value: '1y', label: '1y' },
    { value: '2y', label: '2y' },
    { value: '5y', label: '5y' },
    { value: '10y', label: '10y' },
    { value: 'ytd', label: 'ytd' },
    { value: 'max', label: 'max' },
];
interface periodSelectorInterface {
    setSelectedPeriod: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const PeriodSelector: React.FC<periodSelectorInterface> = ({
    setSelectedPeriod,
}) => {
    return (
        <>
            <ReactSelect
                className="p-3 w-[10vw] rounded-md"
                name="period"
                id="period"
                options={dateOptions}
                defaultValue={dateOptions[2]}  // Set default value to '1d'
                onChange={(option) => setSelectedPeriod(option?.value)}  // Update selectedInterval when the selected option changes
            />
        </>
    )
}

// CompanySelect.tsx

interface CompanySelectProps {
    options: { value: string, label: string }[] | undefined;
    selectedCompany: string | undefined;
    setSelectedCompany: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export const CompanySelector: React.FC<CompanySelectProps> = ({ options, selectedCompany, setSelectedCompany }) => {
    return (
        <ReactSelect
            className="p-3 w-[30vw] rounded-md"
            name="companyName"
            id="company"
            value={options?.find((option) => option.value === selectedCompany)}
            onChange={(option) => setSelectedCompany(option?.value)}
            options={options}
            isSearchable
        />
    );
}

// FetchDataButton.tsx
interface FetchDataButtonProps {
    fetchData: (company: string) => void;
    selectedCompany: string | undefined;
}

export const FetchDataButton: React.FC<FetchDataButtonProps> = ({ fetchData, selectedCompany }) => {
    return (
        <button
            className=" px-3 py-3 rounded-xl shadow-xl bg-slate-700 text-white font-bold"
            onClick={() => fetchData(`${selectedCompany}`)}
        >
            Get Data
        </button>
    );
}


// BuyStockInput.tsx
interface BuyStockInputProps {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    buyStock: () => void;
}

export const BuyStockInput: React.FC<BuyStockInputProps> = ({ quantity, setQuantity, buyStock }) => {
    return (
        <div className="filters  mb-5 flex justify-center items-center">
            <input
                type="number"
                name="quantity"
                id="quantity"
                value={quantity}
                className="bg-gray-50 w-24 border border-gray-300 text-gray-900 text-sm py-1 focus:ring-blue-500 focus:border-blue-500 block outline-none "
                onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button
                className="p-3 ml-2 rounded-xl shadow-md bg-green-600 text-white font-bold"
                onClick={buyStock}
            >
                Buy
            </button>
        </div>
    );
}

export default BuyStockInput;