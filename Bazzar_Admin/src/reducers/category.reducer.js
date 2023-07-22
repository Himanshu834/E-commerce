import { categoryConstants } from "../actions/constants";

const initState={
    categories:[],
    loading:false,
    error:null
};
const buildNewCategories=(id,categories,category)=>{
    let myCategories=[];
    if(id==undefined){
        return[
            ...categories,
            {
                _id:category._id,
                name:category.name,
                slug:category.slug,
                type:category.type,
                children:[]
            }
        ];
    }
    for(let cat of categories){
        if(cat._id==id){
            const newCategory={
                _id:category._id,
                name:category.name,
                slug:category.slug,
                parentId:category.parentId,
                type:category.type,
                children:[]
            };

            myCategories.push({
                ...cat,
                children:cat.children.length > 0? [...cat.children,newCategory]:[newCategory]
            });
        }
        else{
            myCategories.push({
                ...cat,
                children:cat.children ? buildNewCategories(id,cat.children,category):[]
            });
        }
        
    }
    return myCategories;
}

export default (state=initState,action)=>{
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state={
                ...state,
                categories:action.payload.categories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORIES_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORIES_SUCCESS:
            const updatedCategories=buildNewCategories(action.payload.category.parentId,state.categories,action.payload.category);
            console.log(updatedCategories);
            state={
                ...state,
                categories:updatedCategories,
                loading:false
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORIES_FAILURE:
                state={
                    ...initState
                }
                break;
        case categoryConstants.UPDATE_CATEGORIES_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
            state={
                ...state,
                loading:false
            }
            break;
        case categoryConstants.UPDATE_CATEGORIES_FAILURE:
            state={
                ...state,
                error: action.payload.error,
                loading:false
            }
            break;
        case categoryConstants.DELETE_CATEGORIES_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case categoryConstants.DELETE_CATEGORIES_SUCCESS:
            state={
                ...state,
                loading:false
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
            state={
                ...state,
                loading:false,
                error: action.payload.error
            }
            break;
    }
    return state;
}