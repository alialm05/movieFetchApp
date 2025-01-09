
function PasswordFeild({password, setPassword}) {

    return (
        
        <div className=
        "flex flex-row items-center justify-center bg-white w-1/3 rounded-full px-5 my-3 mb-10">
            <input className=
            "block w-full h-full rounded-md border-0 py-3 pl-1 pr-10 text-gray-600 md:text-lg md:leading-6"
            placeholder="Password" 
            value={password} 
            type="password"
            required
            onChange={(e) => {
                setPassword(e.target.value)
                //handlePasswordChange(e.target.value)
                }}
                />
        </div>
    )

}

export default PasswordFeild