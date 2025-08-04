//Formatting Timestamp for updates
export const formatTimestamp=(Timestamp)=>{
    if(!Timestamp){
        return 'No date';
    }
    const date=Timestamp.toDate();
    return date.toLocaleString();
};