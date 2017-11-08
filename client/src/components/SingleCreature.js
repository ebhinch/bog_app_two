import React, { Component } from 'react';
import axios from "axios"
import UpdateCreature from "./UpdateCreature"
import { Redirect } from 'react-router-dom'


class SingleCreature extends Component {
    state={
        creature: {
            name: "",
            description: ""
        },
        showEdit: false,
        showList: false
    }

    componentWillMount() {
        this.getCreature()
    }

    getCreature = async () => {
        const creatureId = this.props.match.params.id
        const response = await axios.get(`/api/creatures/${creatureId}`)
        this.setState({ creature: response.data })
    }

    toggleShowEdit = () => {
        this.setState({showEdit: !this.state.showEdit})
    }

    toggleShowList = () => {
        this.setState({showList: !this.state.showList})
    }


    handleChange = (event) => {
        try {
            const clonedCreature = { ...this.state.creature }
            const attribute = event.target.name
            clonedCreature[attribute] = event.target.value

            this.setState({ creature: clonedCreature })

        } catch (error) {
            console.log(error)
        }
    }

    handleSubmit = async (event) => {
        try {
            event.preventDefault()
            const creatureId = this.props.match.params.id
            const updatedCreature = {...this.state.creature}
            const response = await axios.patch(`/api/creatures/${creatureId}`, {creature: updatedCreature})

        } catch (error) {
            console.log(error)
        }
    }

    deleteCreature = async (event) => {
        try {
            event.preventDefault()
            const creatureId = this.props.match.params.id
            await axios.delete(`/api/creatures/${creatureId}`)
            
            this.toggleShowList()
            


        } catch (error) {
            console.log(error)
        }
    }


    render() {

        if (this.state.showList) {
            return (<Redirect to= {"/"} />)
        }


        return (
            <div>
                <h1>Name: {this.state.creature.name}</h1>

                <h3>About Me: {this.state.creature.description}</h3>

                <button onClick={this.toggleShowEdit}>Update Details</button>

                {this.state.showEdit ? <UpdateCreature handleChange={this.handleChange} handleSubmit={this.handleSubmit} name={this.state.creature.name} description={this.state.creature.description} /> : null}

                <button onClick={this.deleteCreature}>Delete {this.state.creature.name}</button>
     
            </div>
        );
    }
}

export default SingleCreature;
