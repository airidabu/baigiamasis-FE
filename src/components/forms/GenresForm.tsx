const GenresForm: React.FC = () => {
    return (
        <form>
            <label htmlFor="genre-name">Genre Name</label>
            <input type="text" id="genre-name" name="genre-name" />
        </form>
    )
}

export default GenresForm;