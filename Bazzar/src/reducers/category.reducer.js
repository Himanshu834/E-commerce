import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: null
};
const buildNewCategories = (id, categories, category) => {
    let myCategories = [];
    if (id == undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ];
    }
    for (let cat of categories) {
        if (cat._id == id) {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(id, [...cat.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }], category) : []
            });
        }
        else {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(id, cat.children, category) : []
            });
        }

    }
    return myCategories;
}

export default (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORIES_SUCCESS:
            const updatedCategories = buildNewCategories(action.payload.category.parentId, state.categories, action.payload.category);
            console.log(updatedCategories);
            state = {
                ...state,
                categories: updatedCategories,
                loading: false
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORIES_FAILURE:
            state = {
                ...initState
            }
            break;
        case categoryConstants.GET_CATEGORY_DETAILS_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.GET_CATEGORY_DETAILS_BY_ID_SUCCESS:
            state = {
                ...state,
                loading: false,
                categoryDetails: action.payload.categoryDetails
            }
            break;
        case categoryConstants.GET_CATEGORY_DETAILS_BY_ID_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
    }
    return state;
}