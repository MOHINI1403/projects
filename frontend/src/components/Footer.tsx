const Footer = () => {
    return (
      <div className="bg-gray-900 py-10 border-t border-white">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-2xl text-white font-bold tracking-tight">
            MernHolidays.com
          </span>
          <span className="text-white font-bold tracking-tight flex gap-4">
            <p className="cursor-pointer">Privacy Policy</p>
            <p className="cursor-pointer">Terms of Service</p>
          </span>
        </div>
      </div>
    );
  };
  
  export default Footer;
