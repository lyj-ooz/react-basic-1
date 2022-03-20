import "./App.css";
import { useState } from "react";

function Header(props) {
    return (
        <header>
            <h1>
                <a
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        props.onClickHeader();
                    }}
                >
                    {props.title}
                </a>
            </h1>
        </header>
    );
}

function Nav(props) {
    const lis = [];
    for (let i = 0; i < props.topics.length; i++) {
        let t = props.topics[i];
        lis.push(
            <li key={t.id}>
                <a
                    href={"/read/" + t.id}
                    onClick={(e) => {
                        e.preventDefault();
                        props.onClickNav(t.id);
                    }}
                >
                    {t.title}
                </a>
            </li>
        );
    }
    return (
        <nav>
            <ol>{lis}</ol>
        </nav>
    );
}

function Article(props) {
    return (
        <article>
            <h2>{props.title}</h2>
            {props.body}
        </article>
    );
}

function Create(props) {
    return (
        <article>
            <h2>Create~</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const title = e.target.title.value;
                    const body = e.target.body.value;
                    props.onCreate(title, body);
                }}
            >
                <p>
                    <input type="text" name="title" placeholder="Enter title" />
                </p>
                <p>
                    <textarea name="body" placeholder="Enter text.."></textarea>
                </p>
                <p>
                    <input type="submit" value="Create" />
                </p>
            </form>
        </article>
    );
}

function App() {
    const [mode, setMode] = useState("WELCOME");
    const [id, setId] = useState(null);
    const [nextId, setNextId] = useState(4);
    let content = null;
    const [topics, setTopics] = useState([
        { id: 1, title: "Html", body: "html is..." },
        { id: 2, title: "Css", body: "css is..." },
        { id: 3, title: "JavaScript", body: "js is..." },
    ]);

    if (mode === "WELCOME") {
        content = <Article title="Welcome~!~" body="Hello~, WEB"></Article>;
    } else if (mode === "READ") {
        const chosenTopic = topics.filter((topic) => topic.id === id)[0];
        content = (
            <Article
                title={chosenTopic.title}
                body={chosenTopic.body}
            ></Article>
        );
    } else if (mode === "CREATE") {
        content = (
            <Create
                onCreate={(newTitle, newBody) => {
                    const newTopic = {
                        id: nextId,
                        title: newTitle,
                        body: newBody,
                    };
                    let copiedTopics = [...topics];
                    copiedTopics.push(newTopic);
                    setTopics(copiedTopics);
                    setMode("READ");
                    setId(nextId);
                    setNextId(nextId + 1);
                }}
            ></Create>
        );
    }

    return (
        <div>
            <Header
                title="ReAcT"
                onClickHeader={() => {
                    setMode("WELCOME");
                }}
            ></Header>
            <Nav
                topics={topics}
                onClickNav={(id) => {
                    setMode("READ");
                    setId(id);
                }}
            ></Nav>
            {content}
            <a
                href="/create"
                onClick={(e) => {
                    e.preventDefault();
                    setMode("CREATE");
                }}
            >
                Create
            </a>
        </div>
    );
}

export default App;
