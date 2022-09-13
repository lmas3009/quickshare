const Header = () => {
    return (
        <div className="w-full flex items-center justify-between poppins p-5">
            <div>
                <p className="cursor-pointer">QuickShare</p>
            </div>
            <div className="flex gap-3">
                <a href="/auth" className="bg-black p-2 rounded text-white pl-4 pr-4 cursor-pointer">Get started</a>
            </div>
        </div>
    )
}

export default Header;