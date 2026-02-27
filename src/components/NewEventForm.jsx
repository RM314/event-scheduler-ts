const NewEventForm = ({ onSubmit}) => {
    return (
        <form className="w-full max-w-full" onSubmit={onSubmit}>
            <h1 className="text-2xl font-semibold mb-6">New Event</h1>

            {/*title+date+description*/}
            <fieldset className="fieldset space-y-2 w-full">
                <legend className="fieldset-legend">Event:</legend>
                <label className="form-control flex flex-col md:flex-row md:items-center md:gap-4">
                     <div className="label md:w-32">
                    <span className="label-text">Title</span>
                    </div>
                    <input
                     className="input input-bordered "
                        type="text"
                        name="title"
                        required
                        placeholder="Title"
                    />
                </label>
                <label className="form-control flex flex-col md:flex-row md:items-center md:gap-4">
                    <div className="label md:w-32">
                        <span className="label-text">Date</span>
                     </div>
                    <input
                     className="input input-bordered"
                        type="datetime-local"
                        name="date"
                        required
                        placeholder="Date"
                    />
                </label>
                <label className="form-control flex flex-col md:flex-row md:items-center md:gap-4">
                    <div className="label md:w-32">
                        <span className="label-text">Description</span>
                    </div>
                    <textarea
                        name="description"
                        rows="5"
                        className="textarea textarea-bordered"
                    />
                </label>
            </fieldset>


            {/*location+latitude+longitude*/}
            <fieldset className="fieldset space-y-2">
                <legend className="fieldset-legend">Location</legend>

                <label className="form-control flex flex-col md:flex-row md:items-center md:gap-4">
                    <div className="label md:w-32">
                    <span className="label-text">Location</span>
                    </div>
                    <input
                    className="input input-bordered"
                    type="text"
                    name="location"
                    required
                    placeholder="Seven Mile Beach"
                    />
                </label>

                <label className="form-control flex flex-col md:flex-row md:items-center md:gap-4">
                    <div className="label md:w-32">
                    <span className="label-text">Latitude</span>
                    </div>
                    <input
                    className="input input-bordered"
                    type="number"
                    step="any"
                    min="-90"
                    max="90"
                    name="latitude"
                    required
                    placeholder="18.3140"
                    />
                </label>

                <label className="form-control flex flex-col md:flex-row md:items-center md:gap-4">
                    <div className="label md:w-32">
                    <span className="label-text">Longitude</span>
                    </div>
                    <input
                    className="input input-bordered"
                    type="number"
                    step="any"
                    min="-180"
                    max="180"
                    name="longitude"
                    required
                    placeholder="-78.3485"
                    />
                </label>
            </fieldset>



            <input type="submit" value="Submit" className="btn px-10 mt-4" />
        </form>
    )
}

export default  NewEventForm ;