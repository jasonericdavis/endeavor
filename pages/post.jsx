import {withRouter} from 'next/router'


export default withRouter((props) => {
    console.log(props);
    return <div>This page is titled { (props.router.query.title ? props.router.query.title : '')}</div>
})