const BooksForm: React.FC = () => {
    return (
        <form>
            <div className="form-control">
                <label htmlFor="title">Books Title</label>
                <input type="text" name="title" id="title" />
            </div>
            <div className="form-control">
                <label htmlFor="image">Image URL</label>
                <input type="text" name="image" id="image" />
            </div>
            <div className="form-control">
                <label htmlFor="author">Select Book author</label>
                <select name="authors" id="authors-select">
                    <option value="">--Please select and author</option>
                    <option value="1">Author 1</option>
                </select>
            </div>
            <div className="form-control">
                <label htmlFor="genres">Select Book genre</label>
                <select name="genres" id="genres-select">
                    <option value="">--Please select a genre</option>
                    <option value="1">Genre 1</option>
                </select>
            </div>
            <button>Add New Book</button>
        </form>
    )
}

export default BooksForm;