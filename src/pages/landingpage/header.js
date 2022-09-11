const Header = () => {
    return (
        <div className="w-full flex items-center justify-between poppins p-5">
            <div>
                <p>QuickShare</p>
            </div>
            <div className="flex gap-3">
                <p className="bg-black p-2 rounded text-white pl-4 pr-4 cursor-pointer">Get started</p>
            </div>
        </div>
    )
}

export default Header;