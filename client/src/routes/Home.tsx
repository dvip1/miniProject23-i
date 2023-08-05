import '../components/homeStyles.css';
import RootNav from '../components/partials/homeNav';
export default function Home() {
    return (
        <>
            <div className="my-container">
                <RootNav />
                <div className="center">
                    <h1>Welcome to TradeVista</h1>
                    <p className='description'>Your gateway to Financial Proficiency</p>
                    <div className="info">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos animi unde iure, vitae illum eligendi excepturi quaerat similique. Sapiente dolorum, earum eveniet exercitationem facilis ipsam voluptate aliquid corporis autem sint?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime reprehenderit fugiat ad voluptatem, odio </p>
                    </div>
                    <button>
                        Get Started
                    </button>
                </div>
            </div>
        </>
    )
}