class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
        connectedCallback() {
            this.render();
        }

        render() {
            this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --card-bg: var(--bg);
                    --card-text: var(--text);
                    --card-border: var(--accent);

                    display: block;
                    background: var(--card-bg);
                    color: var(--card-text);
                    border: 2px solid var(--card-border);
                    border-radius: 1rem;
                    padding: 1.5rem;
                    width: clamp(280px, 80%, 450px);
                    min-height: 550px;
                    height: auto;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
                    transition: transform .2s ease, box-shadow .2s ease;
                }

                :host(:hover) {
                    transform: scale(1.02);
                    box-shadow: 0 6px 16px rgba(0,0,0,0.25);
                }

                h2 {
                    font-size: clamp(1.5rem, 3dvw, 2.5rem);
                    margin-top: 0;
                    text-align: center;
                }

                p {
                    font-size: clamp(1rem, 1.6dvw, 1.25rem);
                    text-align: center;
                    line-height: 1.4;
                }

                picture img {
                    width: 100%;
                    border-radius: .7rem;
                    margin: 1rem 0;
                }

                a {
                    color: var(--accent);
                    text-decoration: none;
                    font-weight: 600;
                    display: block;
                    text-align: center;
                    margin-top: 1rem;
                }

                a:hover {
                    text-decoration: underline;
                }
            </style>

            <h2>${this.getAttribute("title")}</h2>

            <picture>
                <img src="${this.getAttribute("img")}" alt="${this.getAttribute("alt")}">
            </picture>

            <p>${this.getAttribute("desc")}</p>

            <a href="${this.getAttribute("link")}" target="_blank">Learn More →</a>
            `;
        }
}


customElements.define("project-card", ProjectCard);
