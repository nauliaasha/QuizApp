class AppBar extends HTMLElement {

    connectedCallback(){
        this.render();
    }
 
    render() {
        this.innerHTML = `
        <nav class="navbar navbar-dark bg-dark">
            <span class="navbar-brand h1">Quiz App</span>
        </nav>`;
    }
 }
 
 customElements.define("app-bar", AppBar);
 