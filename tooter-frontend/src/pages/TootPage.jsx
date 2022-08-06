import TootList from "../components/TootList";
import styles from "./TootPage.module.css"
import useToots from "../hooks/useToots";
import useMe from "../hooks/useMe";
import CreateTootForm from "../components/CreateTootForm";
import useCreateToot from "../hooks/useCreateToot";
import {useState} from "react";

const TootPage = () => {
    const [search, setSearch] = useState("")
    const { toots } = useToots(search);
    const {me} = useMe()
    const [addToot] = useCreateToot();
    const handleClick = async (values) => {
        const { content } = values;
        try {
            // call the mutate function here with the right arguments
            const {data} = await addToot(content);
            console.log(data)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={styles.container}>
            <h1>All Toots</h1>
            {me && <CreateTootForm handleClick={handleClick}/>}
            <input className={styles.filterInput} onChange={(e) => setSearch(e.target.value)} placeholder={"Filter Toots"}/>
            <TootList toots={toots} showLink={true} curUser={me}/>
        </div>
    );
}

export default TootPage;