<template>
    <div class="tag-list">
        <span class="category" :class="categoryMapping[quiz.category]">{{ quiz.category }}</span>
        <span class="type">{{ quiz.type }}</span>
    </div>
</template>
<script>
export default {
    props: {
        quiz: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            typeMapping: {
                "Викторина": "quiz",
            },
            categoryMapping: {
                "Искусство": "art",
                "Общество": "society",
                "Кино": "cinema",
                "Литература": "literture",
                "Музыка": "music",
            }
        }
    }
}
</script>
<style scoped>
div{
    display: flex;
    gap: 8px;
}
span {
    font-size: 18px;
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: 500;
    border: 1px solid rgb(172, 172, 172);
    color: white;
}
.category.art {
    border-color: #FFC759;
    color: #FFC759;
}
.category.society {
    border-color: #FF54C9;
    color: #FF54C9;
}
.category.cinema {
    border-color: #AEB8FE;
    color: #AEB8FE;
}
.category.literture {
    border-color: #FF8600;
    color: #FF8600;
}
.category.music {
    border-color: #82D400;
    color: #82D400;
}
</style>