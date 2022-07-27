import useToots from "../hooks/useToots";
import Toot from "./Toot";

const TootList = () => {

    //const { toots } = useToots();
    const toots = undefined;
    if (!toots) {
        return (
            <div>
                loading
            </div>
        )
    }
    return (
        <div>
            {toots.map(toot => <Toot key={toot.id} toot={toot}/>)}
        </div>
    )

}

export default TootList;