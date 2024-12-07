// レシピデータ
const recipes = [
    { item1: "木材", item2: "石", result: "斧 🪓" },
    { item1: "種", item2: "水", result: "作物 🌾" }
];

let selectedItems = [];

// アイテムを選択するイベント
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
        if (selectedItems.length < 2) {
            selectedItems.push(item.dataset.item);
            item.style.backgroundColor = '#d0f0c0'; // 選択時の色
        }
    });
});

// クラフトボタンの処理
document.getElementById('craftButton').addEventListener('click', () => {
    if (selectedItems.length === 2) {
        const recipe = recipes.find(r =>
            (r.item1 === selectedItems[0] && r.item2 === selectedItems[1]) ||
            (r.item1 === selectedItems[1] && r.item2 === selectedItems[0])
        );

        const resultDiv = document.getElementById('result');
        if (recipe) {
            resultDiv.textContent = `成功！作成したもの: ${recipe.result}`;
        } else {
            resultDiv.textContent = "クラフト失敗！レシピが見つかりません。";
        }
    } else {
        alert("アイテムを2つ選択してください！");
    }

    // 選択をリセット
    document.querySelectorAll('.item').forEach(item => item.style.backgroundColor = '');
    selectedItems = [];
});
