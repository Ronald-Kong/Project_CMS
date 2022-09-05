export default (state=0,action)=>{
    switch(action.type)
    {   case "increase":
        state++;
        break;
        default:
            break;
    }
    return state;
}