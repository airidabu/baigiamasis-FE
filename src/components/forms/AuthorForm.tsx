const AuthorForm: React.FC = () => {
    return (
        <>
            <h1>Add New Author</h1>
            <form>
                <div className="form-control">
                    <label htmlFor="name">Full Name</label>
                    <input name="name" id="name" type="text" />
                </div>
                <div className="birthday">
                    <h2>Date of Birth</h2>
                    <div className="form-control">
                        <label htmlFor="year">Year</label>
                        <input type="number" id="year" name="year" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="month">Month</label>
                        <input type="number" id="month" name="month" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="day">Day</label>
                        <input type="number" id="day" name="day" />
                    </div>
                </div>
                <div className="form-control">
                    <label htmlFor="profile-photo">Author's Photo</label>
                    <input type="text" name="photo" id="profile-photo" />
                </div>
                <button>Add New Author</button>
            </form>
        </>
    )
}

export default AuthorForm;