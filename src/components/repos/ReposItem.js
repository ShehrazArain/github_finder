import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ReposItem = ({ repo }) => {
    return (
        <Fragment>

            <div className="card">
                <h3><a href={repo.html_url}></a>{repo.name}</h3>
                <small className="badge badge-dark">Watch: {repo.watchers_count}</small>
                <small className="badge badge-primary">Forks: {repo.forks}</small>
                <small className="badge badge-light">Stars: {repo.stargazers_count}</small>
            </div>


        </Fragment>
    )
}

ReposItem.propTypes = {
    repo: PropTypes.object.isRequired,
}

export default ReposItem;
