function Footer() {
    return(
        <footer className="footer">
            <hr  className="opacity-10"></hr>
            <p className="footer-text">
                MovieFetch &copy; {new Date().getFullYear()}
            </p>
            
        </footer>
    );
}

export default Footer;