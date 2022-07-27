import useToots from "../hooks/useToots";
import Toot from "./Toot";
import axios from "axios"
import {useEffect} from "react";

const TootList = () => {
//try to fetch port
    const { toots } = useToots();
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/test/test')
            .then(response => {
                console.log(response)
            })
    }, [])
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