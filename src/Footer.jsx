function Footer() {
    return(
        <footer className="footer">
            <hr></hr>
            <p className="footer-text">
                MovieFetch &copy; {new Date().getFullYear()}
            </p>
            
        </footer>
    );
}

export default Footer;