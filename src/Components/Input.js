import styled from "@emotion/styled"
import { Box } from "@mui/material"

const MyInput = styled('input')({
    width: 220,
    height: 40,
    border: 'none',
    outline: 'none',
    paddingInline: '10px',
    borderRadius: '4px',
})

function Input(props){
    return(
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            background: 'white',
            borderRadius: '4px',
        }}>
            <MyInput type={props.type} placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.onChange}/>
            <Box sx={{paddingRight:1, display:'flex', alignItems: 'center'}}>
                {props.icon}
            </Box>
        </Box>
    )
}

export default Input