const UserForm: React.FC = () => {
    return (
        <form>
            <div className="form-control">
                <label htmlFor="name">Full Name</label>
                <input type="text" name="name" id="name" />
            </div>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
            </div>
        </form>
    )
}

export default UserForm;