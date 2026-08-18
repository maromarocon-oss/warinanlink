/* ==========================================================================
   灯 AKARI COFFEE STAND ― Product & Menu Data
   価格は現時点の参考価格です。開業に向けて確定させていきます。
   ========================================================================== */

window.AKARI_DATA = {

  /* ---- オンラインストア商品(豆・チャイ / カート対応) ---- */
  products: [
    {
      id: 'coffee-ethiopia',
      category: 'coffee',
      name: 'エチオピア イルガチェフェ',
      origin: 'エチオピア / イルガチェフェ',
      badge: 'NEW',
      media: 1,
      lead: '華やかな香りと透明感のある酸味。浅煎りコーヒーの入り口としても選ばれる一杯。',
      desc: '標高1,900m前後の高地で栽培された豆を浅煎りで仕上げました。ベルガモットやレモンティーを思わせる香り、紅茶のような透明感のある口当たりが特徴です。ハンドドリップでの抽出がおすすめです。',
      notes: [
        { label: 'ROAST', val: '浅煎り' },
        { label: 'PROCESS', val: 'ウォッシュト' },
        { label: 'FLAVOR', val: 'フローラル' }
      ],
      variants: [
        { id: '100g', label: '100g', price: 1200 },
        { id: '200g', label: '200g', price: 2200 }
      ]
    },
    {
      id: 'coffee-guatemala',
      category: 'coffee',
      name: 'グアテマラ ウエウエテナンゴ',
      origin: 'グアテマラ / ウエウエテナンゴ',
      badge: '',
      media: 2,
      lead: '甘さと優しい酸味のバランスが取れた、毎日飲みたくなる一杯。',
      desc: '標高1,700mを超える高地栽培のティピカ種を中心にブレンド。ミルクチョコレートやナッツ、キャラメルのような甘い余韻が続きます。ミルクとの相性もよく、カフェラテのベースにもおすすめです。',
      notes: [
        { label: 'ROAST', val: '中煎り' },
        { label: 'PROCESS', val: 'ウォッシュト' },
        { label: 'FLAVOR', val: 'ナッツ・キャラメル' }
      ],
      variants: [
        { id: '100g', label: '100g', price: 1100 },
        { id: '200g', label: '200g', price: 2000 }
      ]
    },
    {
      id: 'coffee-kenya',
      category: 'coffee',
      name: 'ケニア ニエリ',
      origin: 'ケニア / ニエリ',
      badge: '限定入荷',
      media: 3,
      lead: '華やかで力強い酸味と厚みのあるコク。専門性のある一杯を求める方に。',
      desc: '肥沃な赤土で育つケニア特有のSLコーヒー種を使用。カシスやベリーを思わせる鮮やかな酸味と、しっかりとしたボディが両立した、飲みごたえのある一杯です。',
      notes: [
        { label: 'ROAST', val: '中煎り' },
        { label: 'PROCESS', val: 'ウォッシュト' },
        { label: 'FLAVOR', val: 'ベリー・カシス' }
      ],
      variants: [
        { id: '100g', label: '100g', price: 1300 },
        { id: '200g', label: '200g', price: 2400 }
      ]
    },
    {
      id: 'coffee-brazil',
      category: 'coffee',
      name: 'ブラジル セラード',
      origin: 'ブラジル / セラード',
      badge: '',
      media: 4,
      lead: 'まろやかで飲みやすい、店の定番となる一杯。',
      desc: '低酸味でナッツやミルクチョコレートのような甘みを感じる、バランス型のブレンドベース。深煎り寄りに仕上げているので、ミルクや氷を使ったアレンジにも負けない味の強さがあります。',
      notes: [
        { label: 'ROAST', val: '中深煎り' },
        { label: 'PROCESS', val: 'ナチュラル' },
        { label: 'FLAVOR', val: 'ナッツ・低酸味' }
      ],
      variants: [
        { id: '100g', label: '100g', price: 1000 },
        { id: '200g', label: '200g', price: 1800 }
      ]
    },
    {
      id: 'chai-original',
      category: 'chai',
      name: 'オリジナルチャイブレンド',
      origin: 'インド産スパイス使用',
      badge: '看板商品',
      media: 5,
      lead: 'インドから直接仕入れたスパイスと茶葉をブレンド。牛乳で煮出すだけで、店の一杯がご家庭で。',
      desc: 'アッサム茶葉に、シナモン・カルダモン・ジンジャー・クローブなど6種のスパイスを配合したオリジナルブレンドです。鍋に茶葉と牛乳を入れて煮出すだけで、専門店のマサラチャイをご自宅でお楽しみいただけます。',
      notes: [
        { label: 'BASE', val: 'アッサム茶葉' },
        { label: 'SPICE', val: '6種配合' },
        { label: 'ORIGIN', val: 'インド直輸入' }
      ],
      variants: [
        { id: '100g', label: '100g(約10杯分)', price: 1400 },
        { id: '200g', label: '200g(約20杯分)', price: 2600 }
      ]
    },
    {
      id: 'chai-concentrate',
      category: 'chai',
      name: 'チャイベースシロップ',
      origin: '無香料・無着色',
      badge: '',
      media: 6,
      lead: '牛乳や豆乳で割るだけの濃縮チャイシロップ。忙しい朝でも本格的な一杯を。',
      desc: 'スパイスをじっくり煮出して濃縮したシロップタイプ。牛乳・豆乳・お湯で好みの濃さに割るだけで、アイスでもホットでも本格的なチャイに仕上がります。',
      notes: [
        { label: 'TYPE', val: '濃縮シロップ' },
        { label: 'SPICE', val: '6種配合' },
        { label: 'ARRANGE', val: 'HOT / ICE' }
      ],
      variants: [
        { id: '300ml', label: '300ml(約6杯分)', price: 1600 }
      ]
    }
  ],

  /* ---- 店内メニュー(開業後、店頭でご提供 / オンライン購入対象外) ---- */
  menuGroups: [
    {
      title: 'スペシャルティコーヒー',
      items: [
        { name: 'ドリップコーヒー(本日の一杯)', note: '産地の異なる豆から日替わりで選べます', price: '¥500〜700' },
        { name: 'カフェラテ', note: 'エスプレッソ+ミルク', price: '¥600〜800' },
        { name: 'アイスコーヒー', note: '', price: '¥550〜750' }
      ]
    },
    {
      title: 'チャイ & 紅茶',
      items: [
        { name: 'マサラチャイ', note: 'インド仕込みのスパイスをじっくり煮出す本格製法', price: '¥600〜800' },
        { name: 'アイスチャイ', note: '', price: '¥650〜850' },
        { name: 'ダージリンティー', note: '', price: '¥600〜900' }
      ]
    },
    {
      title: 'クレープ & 焼菓子',
      items: [
        { name: 'カスタード&キャラメルクレープ', note: '店内で一枚ずつ焼き上げます', price: '¥600〜900' },
        { name: '季節のフルーツクレープ', note: '仕入れ状況により内容が変わります', price: '¥700〜1,000' },
        { name: '本日の焼菓子', note: '近隣の工房より仕入れ', price: '¥450〜550' }
      ]
    },
    {
      title: '夜のドリンク(17:00〜 提供予定)',
      items: [
        { name: 'クラフトカクテル', note: 'コーヒーやチャイを使ったオリジナルレシピなど', price: '¥900〜1,200' },
        { name: 'ワイン(グラス)', note: '', price: '¥800〜1,100' },
        { name: 'クラフトビール', note: '', price: '¥800〜1,000' }
      ]
    }
  ]
};
