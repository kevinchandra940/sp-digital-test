import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import {
    Card,
    CardActionArea,
    CardMedia,
    Typography,
    CardActions,
    CardContent,
    Button,
    Modal,
    Box
} from '@material-ui/core'

import { getDataProducts } from '../actions'


class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: {},
            open: false,
            setOpen: false,
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:2000/products')
            .then(res => {
                // this.setState({products : res.data})
                // this.setState({products : res.data[0]})
                this.props.getDataProducts(res.data)
            })
            .catch(err => console.log(err))
    }


    handleOpen = () => {
        this.setState({ setOpen: !this.state.setOpen })
    }

    handleClose = () => {
        this.setState({ setOpen: !this.state.setOpen })
    }

    renderCard = () => {
        return this.props.product.map((item, index) => {
            return (
                <Card style={styles.card} key={item.id}>
                    <CardActionArea style={styles.contentArea}>
                        <CardMedia image={item.images[0]} component="img" style={styles.contentImage} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {`$${item.price}`}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions style={styles.contentActions}>
                        <Button size="small" color="primary" onClick={this.handleOpen}>
                            Buy Now
                        </Button>
                    </CardActions>
                    <div>
                        <Modal
                            open={this.state.setOpen}
                            onClose={this.handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box style={styles.modal}>
                                <Typography id="modal-modal-title" variant="h5" component="h1">
                                    Toppings
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {
                                        (item.topping ? item.topping : []).map((item, index) => {
                                            return <Button
                                                key={index}
                                                variant="outlined"
                                                onClick={() => this.setState({ topping: item.topping })}
                                            >{item.topping}</Button>
                                        })
                                    }
                                </Typography>
                            </Box>
                        </Modal>
                    </div>
                </Card>
            )
        })
    }

    renderTotal = () => {
        // return this.props.total.map((item, index) => {
        return (
            <Card style={styles.card}>
                <CardActionArea style={styles.contentArea}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Cart
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions style={styles.contentActions}>
                    <Typography gutterBottom variant="h5" component="h2">
                        Total
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        $15
                    </Typography>
                </CardActions>
            </Card>
        )
        // })
    }

    render() {
        return (
            <div style={styles.root}>
                <h1 style={styles.title}>Pizza List</h1>
                <div style={{ display: 'flex' }}>
                    <div style={styles.cardContainer}>
                        {this.renderCard()}
                    </div>
                    <div>
                        {this.renderTotal()}
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    root: {
        height: 'auto',
        width: '100%',
        backgroundColor: '#f2f2f2',
        padding: '2% 7%'
    },
    title: {
        fontSize: 50,
        fontWight: 600,
        margin: '2% 0px'
    },
    cardContainer: {
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        display: 'flex'
    },
    card: {
        flexBasis: '19%',
        minWidth: '300px',
        marginBottom: '1%',
        marginRight: '1%'
    },
    contentArea: {
        height: '87%',
        padding: '1%'
    },
    contentImage: {
        width: '100%',
        padding: '5%'
    },
    contentActions: {
        height: '13%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    link: {
        textDecoration: 'none'
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 300,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
}


const mapStateToProps = (state) => {
    return {
        product: state.product
    }
}

export default connect(mapStateToProps, { getDataProducts })(Products)