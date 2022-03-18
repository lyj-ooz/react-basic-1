import "./App.css";

function Header(props) {
    return (
        <header>
            <h1>
                <a href="/">{props.title}</a>
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
                <a href={"/read/" + t.id}>{t.title}</a>
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
    const topics = [
        { id: 1, title: "Html", body: "html is..." },
        { id: 2, title: "Css", body: "css is..." },
        { id: 3, title: "JavaScript", body: "js is..." },
    ];
    return (
        <div>
            <Header title="ReAcT"></Header>
            <Header title="ola!"></Header>
            <Nav topics={topics}></Nav>
            <Article title="Welcome~!~" body="Hello~, WEB"></Article>
        </div>
    );
}

export default App;
