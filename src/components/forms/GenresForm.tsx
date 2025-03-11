const GenresForm: React.FC = () => {
    return (
        <form>
            <label htmlFor="genre-name">Genre Name</label>
            <input type="text" id="genre-name" name="genre-name" />
            <button>Submit</button>
        </form>
    )
}

export default GenresForm;