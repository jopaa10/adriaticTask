import "./footer.scss";

function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer>
      <p>Copyright &copy; {date}</p>
    </footer>
  );
}

export default Footer;
