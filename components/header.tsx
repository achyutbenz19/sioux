"use client";
const Header = () => {
  return (
    <div className="w-full flex absolute top-0 font-semibold my-8 ml-10">
      <span
        className="text-xl cursor-pointer"
        onClick={() => window.location.replace("/")}
      >
        Sioux ⚡
      </span>
    </div>
  );
};

export default Header;
