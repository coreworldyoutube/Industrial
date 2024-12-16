// グローバル変数
let inventory = {};
let craftingItems = {};

// JSONファイルを非同期で読み込む
function loadData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            inventory = data.inventory;   // インベントリデータを設定
            craftingItems = data.craftingItems;   // クラフトアイテムデータを設定
            updateInventory();  // インベントリの表示を更新
            updateCraftingOptions();  // クラフト選択肢の表示を更新
        })
        .catch(error => console.error('データ読み込みエラー:', error));
}

// 資源を集める
document.querySelectorAll('.resource').forEach(resource => {
    resource.addEventListener('click', () => {
        const resourceName = resource.dataset.resource;
        
        // 資源がinventoryに存在しない場合、初期値0で追加する
        if (!(resourceName in inventory)) {
            inventory["石のツルハシ"] = 0;
        }

        // 石ピッケルを持っている場合、採掘量を倍にする
        let amountToAdd = 1;
        if (hasStonePickaxe()) {
            amountToAdd *= 2;  // 石のツルハシがあれば倍の量を追加
        }

        inventory[resourceName] += amountToAdd;  // 資源を追加
        console.log(`${resourceName} が${amountToAdd}個追加されました。現在の在庫: ${inventory[resourceName]}`);
        updateInventory();
    });
});

// 在庫管理シーンを更新
function updateInventory() {
    const inventoryDiv = document.getElementById('inventory');
    inventoryDiv.innerHTML = '';  // 在庫の内容をリセット

    // 在庫の内容を表示
    for (const resource in inventory) {
        const resourceDiv = document.createElement('div');
        resourceDiv.textContent = `${resource}: ${inventory[resource]} スタック`;
        inventoryDiv.appendChild(resourceDiv);
    }
    console.log('現在の在庫:', inventory);  // 在庫内容を確認するためにログを追加
}

// クラフトシーンを更新
function updateCraftingOptions() {
    const craftingDiv = document.getElementById('craftingOptions');
    craftingDiv.innerHTML = '';  // クラフト選択肢をリセット

    // クラフトできるアイテムを表示
    for (const item in craftingItems) {
        const itemRequirements = craftingItems[item];
        let canCraft = true;

        // 必要資源が足りているかを確認
        for (const resource in itemRequirements) {
            if (inventory[resource] < itemRequirements[resource]) {
                canCraft = false;
                break;
            }
        }

        // アイテムを作れる場合、ボタンを表示
        if (canCraft) {
            const craftButton = document.createElement('button');
            craftButton.textContent = `${item} を作る`;
            craftButton.addEventListener('click', () => craftItem(item, itemRequirements));
            craftingDiv.appendChild(craftButton);
        }
    }
}

// アイテムをクラフト
function craftItem(item, requirements) {
    // 必要な資源を減らす
    for (const resource in requirements) {
        inventory[resource] -= requirements[resource];
    }

    // クラフトされたアイテムをインベントリに追加
    if (!(item in inventory)) {
        inventory[item] = 0;  // アイテムがインベントリに存在しない場合、初期化
    }
    inventory[item]++;

    // インベントリとクラフトオプションを更新
    updateInventory();
    updateCraftingOptions();

    alert(`${item} を作成しました！`);
}
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

    // クラフトシーンを表示する場合、クラフトオプションを更新
    if (sceneId === 'scene3') {
        updateCraftingOptions();
    }

    // 在庫管理シーンを表示する場合、在庫を更新
    if (sceneId === 'scene2') {
        updateInventory();
    }
}

// ページロード時にデータを読み込む
window.onload = function() {
    loadData();
};
