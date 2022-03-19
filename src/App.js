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

function App() {
    const [mode, setMode] = useState("WELCOME");
    const [id, setId] = useState(null);
    let content = null;
    const topics = [
        { id: 1, title: "Html", body: "html is..." },
        { id: 2, title: "Css", body: "css is..." },
        { id: 3, title: "JavaScript", body: "js is..." },
    ];

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
        </div>
    );
}

// function sayMessage(msg) {
//     alert(msg)
// }

export default App;
