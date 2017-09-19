export class DomElementsProcessing {

    constructor() {}

    public addBloodAfterHeroKill(data: any): void {

        let battleFiled = document.getElementById('battleGround');

        let blood = document.createElement("div");
        blood.className = "hero-was-killed-blood";
        blood.style.top = `${data.positionOnPlayGround.positionOnPlayGroundY - 20}px`;
        blood.style.left= `${data.positionOnPlayGround.positionOnPlayGroundX - 10}px`;

        battleFiled.appendChild(blood);

        setTimeout(() => {
            battleFiled.removeChild(blood);
        }, 3000);
    }
}