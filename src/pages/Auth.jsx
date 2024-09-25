import FlipBox from "../components/UI/FlipBox";
import Header from "../components/UI/Header";
import Input from "../components/UI/Input";
import MainBox from "../components/UI/MainBox";

export default function Auth() {
    return (<>
        <Header />
        <main className="pb-20 pt-28 min-h-screen flex flex-col items-center justify-center">
            <FlipBox frontBox={true} className={"rounded-md w-full max-w-screen-sm relative"}>
                <MainBox className="w-full max-w-screen-md lg:px-8 px-4 py-4 lg:py-6 border border-[#E6E9EB] mainShadow bg-transparent backdrop-blur-lg">
                    <h3>Hey, Welcome!</h3>
                    <br />
                    <form>
                        <Input inputAttributes={{ placeholder: "Full Name *", required: true, name: "fullName" }} />
                        <Input inputAttributes={{ placeholder: "Email *", required: true, name: "email", type: "email" }} />
                        <Input inputAttributes={{ placeholder: "Password *", required: true, name: "password", type: "password", autoComplete: "off" }} />
                        <button type="submit" className="rounded-md font-semibold text-[var(--terColor)] px-4 py-2 bg-[var(--mainColor)]">SIGNUP</button>
                    </form>
                </MainBox>        
                <MainBox className="w-full max-w-screen-md lg:px-8 px-4 py-4 lg:py-6 border border-[#E6E9EB] mainShadow bg-transparent backdrop-blur-lg">
                    <h3>Hey, Welcome back!</h3>
                    <br />
                    <form>
                        <Input inputAttributes={{ placeholder: "Email *", required: true, name: "email", type: "email" }} />
                        <Input inputAttributes={{ placeholder: "Password *", required: true, name: "password", type: "password", autoComplete: "off" }} />
                        <button type="submit" className="rounded-md font-semibold text-[var(--terColor)] px-4 py-2 bg-[var(--mainColor)]">LOGIN</button>
                    </form>
                </MainBox>  
            </FlipBox>
        </main>
    </>);
}

export const loader = async () => {
    return [];
}