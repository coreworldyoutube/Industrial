// 資源の在庫
let inventory = {
    'オーク': 0,
    '落ちている石': 0,
    '水': 0,
    '白樺': 0,
    '種': 0,
    '土': 0,
    '胸鳥さん。': 0
};

// クラフトできるアイテムの設定（必要資源）
const craftingItems = {
    '木の剣': { '木材': 2, '石': 1 },
    '石のツルハシ': { '木材': 1, '石': 3 }
};

// 資源を集める
document.querySelectorAll('.resource').forEach(resource => {
    resource.addEventListener('click', () => {
        const resourceName = resource.dataset.resource;
        inventory[resourceName]++;
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
        resourceDiv.textContent = `${resource}: ${inventory[resource]} 個`;
        inventoryDiv.appendChild(resourceDiv);
    }
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
    updateInventory();  // 在庫を更新
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
