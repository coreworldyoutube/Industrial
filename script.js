// レシピデータ
const recipes = [
    { item1: "木材", item2: "石", result: "斧 🪓" },
    { item1: "種", item2: "水", result: "作物 🌾" }
];

let selectedItems = [];
let craftedItem = "";  // 作成したアイテムを格納する変数

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
    const resultDiv = document.getElementById('result');
    if (selectedItems.length === 2) {
        const recipe = recipes.find(r =>
            (r.item1 === selectedItems[0] && r.item2 === selectedItems[1]) ||
            (r.item1 === selectedItems[1] && r.item2 === selectedItems[0])
        );

        if (recipe) {
            craftedItem = recipe.result;  // 作成したアイテムを保存
            resultDiv.textContent = `成功！作成したもの: ${recipe.result}`;
            changeScene('scene2'); // シーン2に切り替え
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

// シーンを切り替える関数
function changeScene(sceneId) {
    // すべてのシーンを非表示にする
    const scenes = document.querySelectorAll('.scene');
    scenes.forEach(scene => {
        scene.classList.remove('active');
    });

    // 指定されたシーンを表示する
    const sceneToShow = document.getElementById(sceneId);
    sceneToShow.classList.add('active');
    
    // シーン2で作成したアイテムを表示
    if (sceneId === 'scene2') {
        document.getElementById('craftedItem').textContent = `作成したアイテム: ${craftedItem}`;
    }
}
