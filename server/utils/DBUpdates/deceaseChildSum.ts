async function decreaseChildByOne(objToUpdate: any, child: string) {
  objToUpdate[child]--;
  objToUpdate.save();
}

export { decreaseChildByOne };
