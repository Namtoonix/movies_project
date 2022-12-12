function NotFound() {
  return (
    <div className="px-[40px] py-[30px]">
      <h2 className="text-[24px] font-[600] mb-[20px]">
        Oops! We can't find the page you're looking for
      </h2>
      <p className="text-[16px]">
        You tried to request a page that doesn't exist. If you believe this to
        be in error, let us know{" "}
        <a
          href="https://www.themoviedb.org/talk"
          target="_blank"
          rel="noreferrer"
          className="text-[#01b4e4]"
        >
          on the forums.
        </a>
      </p>
    </div>
  );
}

export default NotFound;
