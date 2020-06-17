import React, { Component } from 'react'
import PropTypes from 'prop-types';
class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUser: PropTypes.func.isRequired,
        clearUser: PropTypes.func.isRequired,
        showUser: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })
    onSubmit = e => {
        e.preventDefault()
        if (this.state.text === '') {
            this.props.setAlert('Must enter user name', 'light')
        } else {
            this.props.searchUser(this.state.text)
            this.setState({ text: '' })
        }
    }

    render() {
        const { showUser } = this.props;
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input
                        type="text"
                        name="text"
                        placeholder="Search User..."
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                    <input
                        type="submit"
                        value="search"
                        className="btn btn-dark btn-block"
                    />
                </form>

                {showUser &&
                    <button className='btn btn-light btn-block' onClick={this.props.clearUser}>clear </button>
                }

            </div>
        )
    }
}

export default Search
